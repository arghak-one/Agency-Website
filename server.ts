import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Define Lead type
interface Lead {
  id: string | number;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  service_required: string;
  project_budget: string;
  project_requirements: string;
  status: string;
  created_at: string;
}

// Backup local file path for local development or when Supabase is not yet configured
const BACKUP_FILE = path.join(process.cwd(), 'leads_backup.json');

// Initialize local leads from file if it exists, otherwise empty array
async function loadBackupLeads(): Promise<Lead[]> {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const data = await fs.promises.readFile(BACKUP_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading backup leads:', error);
  }
  return [];
}

async function saveBackupLeads(leads: Lead[]): Promise<void> {
  try {
    await fs.promises.writeFile(BACKUP_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving backup leads:', error);
  }
}

// Lazy Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const isSupabaseConfigured = supabaseUrl.trim() !== '' && supabaseServiceKey.trim() !== '';

let supabase: any = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });
    console.log('Supabase client initialized successfully.');
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
  }
} else {
  console.log('Supabase credentials not found. Using local JSON backup mode for lead storage.');
}

// Admin Token
const ADMIN_TOKEN = 'NEXORA_SECURE_ADMIN_CRM_SESSION_TOKEN_2026';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Submit a lead
  app.post('/api/leads', async (req, res) => {
    try {
      const {
        fullName,
        businessName,
        email,
        phone,
        serviceRequired,
        projectBudget,
        projectRequirements
      } = req.body;

      // Validation
      if (!fullName?.trim() || !businessName?.trim() || !email?.trim() || !phone?.trim() || !serviceRequired?.trim() || !projectBudget?.trim() || !projectRequirements?.trim()) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
      }

      const submissionTime = new Date().toISOString();
      let savedLead: Lead;

      if (isSupabaseConfigured && supabase) {
        try {
          // Save to Supabase
          const { data, error } = await supabase
            .from('leads')
            .insert([
              {
                full_name: fullName,
                business_name: businessName,
                email: email,
                phone: phone,
                service_required: serviceRequired,
                project_budget: projectBudget,
                project_requirements: projectRequirements,
                status: 'New Lead'
              }
            ])
            .select();

          if (error) {
            console.error('Supabase insert error, falling back to local file:', error);
            throw error;
          }

          savedLead = data[0];
        } catch (supabaseErr: any) {
          console.warn('Failing back to local JSON backup storage due to Supabase error:', supabaseErr);
          // Fallback to Local Backup
          const leads = await loadBackupLeads();
          savedLead = {
            id: 'local_' + Date.now().toString(),
            full_name: fullName,
            business_name: businessName,
            email: email,
            phone: phone,
            service_required: serviceRequired,
            project_budget: projectBudget,
            project_requirements: projectRequirements,
            status: 'New Lead',
            created_at: submissionTime
          };
          leads.unshift(savedLead);
          await saveBackupLeads(leads);
        }
      } else {
        // Fallback to Local Backup
        const leads = await loadBackupLeads();
        savedLead = {
          id: 'local_' + Date.now().toString(),
          full_name: fullName,
          business_name: businessName,
          email: email,
          phone: phone,
          service_required: serviceRequired,
          project_budget: projectBudget,
          project_requirements: projectRequirements,
          status: 'New Lead',
          created_at: submissionTime
        };
        leads.unshift(savedLead);
        await saveBackupLeads(leads);
      }

      // Send Email Notification
      const emailSubject = '🚀 New Lead Received - Nexora';
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #2563eb; margin-top: 0; font-size: 22px;">🚀 New Lead Received - Nexora</h2>
          <p style="color: #475569; font-size: 14px; margin-bottom: 24px;">A new project scope inquiry has been submitted through the Nexora landing page contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; width: 180px; color: #64748b;">Full Name</td>
              <td style="padding: 10px 0; font-weight: 500;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Business Name</td>
              <td style="padding: 10px 0; font-weight: 500;">${businessName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email Address</td>
              <td style="padding: 10px 0; font-weight: 500;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone Number</td>
              <td style="padding: 10px 0; font-weight: 500;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Service Required</td>
              <td style="padding: 10px 0; font-weight: 500; color: #0f172a;">${serviceRequired}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Project Budget</td>
              <td style="padding: 10px 0; font-weight: 500; color: #16a34a;">${projectBudget}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Project Requirements</td>
              <td style="padding: 10px 0; line-height: 1.5; white-space: pre-line;">${projectRequirements}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <strong>Submission Time:</strong> ${new Date(submissionTime).toLocaleString()}
          </div>
        </div>
      `;

      const emailText = `
New Lead Received - Nexora
===========================
Full Name: ${fullName}
Business Name: ${businessName}
Email: ${email}
Phone: ${phone}
Service Required: ${serviceRequired}
Budget: ${projectBudget}
Project Requirements: ${projectRequirements}
Submission Time: ${new Date(submissionTime).toLocaleString()}
      `;

      // Check for SMTP configurations
      const smtpHost = process.env.SMTP_HOST || '';
      const smtpPort = process.env.SMTP_PORT || '';
      const smtpUser = process.env.SMTP_USER || '';
      const smtpPass = process.env.SMTP_PASS || '';

      if (smtpHost && smtpPort && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort, 10),
            secure: parseInt(smtpPort, 10) === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: `"Nexora CRM" <${smtpUser}>`,
            to: 'nexora.official.main@gmail.com',
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
          });

          console.log('Lead notification email sent successfully.');
        } catch (mailErr) {
          console.error('SMTP configuration found but email sending failed:', mailErr);
        }
      } else {
        console.log('\n--- [EMAIL NOTIFICATION SIMULATED - SMTP NOT CONFIGED] ---');
        console.log(`To: nexora.official.main@gmail.com`);
        console.log(`Subject: ${emailSubject}`);
        console.log(emailText);
        console.log('----------------------------------------------------------\n');
      }

      return res.status(200).json({
        success: true,
        message: 'Thank you for contacting Nexora. Your project request has been received successfully. Our team will contact you shortly.',
        lead: savedLead
      });

    } catch (err: any) {
      console.error('Error handling new lead:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  // 2. Admin Login
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.ADMIN_PASSWORD || 'nexoracrm2026';

    if (password === correctPassword) {
      return res.status(200).json({ success: true, token: ADMIN_TOKEN });
    } else {
      return res.status(401).json({ success: false, error: 'Incorrect credentials' });
    }
  });

  // 3. Get Leads
  app.get('/api/admin/leads', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_TOKEN}`) {
      return res.status(401).json({ success: false, error: 'Unauthorized access' });
    }

    try {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          return res.status(200).json({ success: true, leads: data, supabase: true, tableMissing: false });
        } catch (supabaseErr: any) {
          console.warn('Supabase query error, falling back to local leads backup:', supabaseErr);
          const leads = await loadBackupLeads();
          return res.status(200).json({ success: true, leads, supabase: true, tableMissing: true });
        }
      } else {
        const leads = await loadBackupLeads();
        return res.status(200).json({ success: true, leads, supabase: false, tableMissing: false });
      }
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch leads' });
    }
  });

  // 4. Update Lead Status
  app.patch('/api/admin/leads/:id/status', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_TOKEN}`) {
      return res.status(401).json({ success: false, error: 'Unauthorized access' });
    }

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['New Lead', 'Contacted', 'Proposal Sent', 'Closed Deal'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid lead status' });
    }

    try {
      if (isSupabaseConfigured && supabase && !id.toString().startsWith('local_')) {
        try {
          const parsedId = isNaN(Number(id)) ? id : Number(id);
          const { data, error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', parsedId)
            .select();

          if (error) throw error;
          return res.status(200).json({ success: true, lead: data[0] });
        } catch (supabaseErr) {
          console.warn('Supabase update failed, falling back to local database update:', supabaseErr);
          // Fall through to local update below
        }
      }

      const leads = await loadBackupLeads();
      const leadIndex = leads.findIndex(l => l.id.toString() === id.toString());
      if (leadIndex === -1) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }
      leads[leadIndex].status = status;
      await saveBackupLeads(leads);
      return res.status(200).json({ success: true, lead: leads[leadIndex] });
    } catch (err: any) {
      console.error('Error updating lead status:', err);
      return res.status(500).json({ success: false, error: 'Failed to update lead status' });
    }
  });

  // 5. Delete Lead
  app.delete('/api/admin/leads/:id', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_TOKEN}`) {
      return res.status(401).json({ success: false, error: 'Unauthorized access' });
    }

    const { id } = req.params;

    try {
      if (isSupabaseConfigured && supabase && !id.toString().startsWith('local_')) {
        try {
          const parsedId = isNaN(Number(id)) ? id : Number(id);
          const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', parsedId);

          if (error) throw error;
          return res.status(200).json({ success: true, message: 'Lead deleted successfully' });
        } catch (supabaseErr) {
          console.warn('Supabase delete failed, falling back to local delete:', supabaseErr);
          // Fall through to local delete below
        }
      }

      const leads = await loadBackupLeads();
      const updatedLeads = leads.filter(l => l.id.toString() !== id.toString());
      if (leads.length === updatedLeads.length) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }
      await saveBackupLeads(updatedLeads);
      return res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    } catch (err: any) {
      console.error('Error deleting lead:', err);
      return res.status(500).json({ success: false, error: 'Failed to delete lead' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
