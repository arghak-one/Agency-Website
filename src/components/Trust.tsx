import { motion } from 'motion/react';

export default function Trust() {
  const brands = [
    {
      name: 'Google',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 1.623 15.36 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.195-1.925H12.24z"/>
        </svg>
      )
    },
    {
      name: 'Meta',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M15.421 2c-2.42 0-4.385 1.964-4.385 4.384v2.012H8.384V11.23h2.652v7.712h3.195V11.23h2.645l.348-2.834h-2.993V6.384c0-.78.163-1.19 1.13-1.19h1.83V2h-3.17z"/>
        </svg>
      )
    },
    {
      name: 'OpenAI',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M21.734 9.172c-.156-.84-.502-1.62-1.042-2.28a5.27 5.27 0 0 0-2.868-1.887 5.22 5.22 0 0 0-3.37.195 5.282 5.282 0 0 0-2.274 1.777 5.293 5.293 0 0 0-2.274-1.777 5.22 5.22 0 0 0-3.37-.195C5.1 5.358 3.864 6.3 3.1 7.641c-.482.842-.716 1.791-.682 2.748a5.272 5.272 0 0 0 1.259 3.208 5.22 5.22 0 0 0 2.453 1.583 5.282 5.282 0 0 0 3.3 0V11a3.02 3.02 0 0 1 3.02-3.02h2.22A3.02 3.02 0 0 1 17.7 11v4.18a5.28 5.28 0 0 0 3.3 0c1.03-.314 1.885-1.579 2.193-2.617a5.272 5.272 0 0 0-1.459-3.391zM11.71 14.5a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"/>
        </svg>
      )
    },
    {
      name: 'Shopify',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.04 4.88c-.14-.4-1.14-2.88-1.14-2.88a.5.5 0 0 0-.46-.3H10.1a.5.5 0 0 0-.5.42s-.36 2.34-.4 2.6c-.3.04-.6.06-.88.1L6.16.82a.5.5 0 0 0-.46-.3H2.02a.5.5 0 0 0-.5.48c0 .24 1.48 13.9 1.48 13.9a1.6 1.6 0 0 0 1.58 1.4h4.16a7.22 7.22 0 0 0 2.42 4.4a.5.5 0 0 0 .66.02a7.1 7.1 0 0 0 2.22-3.14a1.6 1.6 0 0 0 1.43-1.28c.45-3.32 1.48-11.4 1.58-11.82zM4.78 14.88c-.18 0-.32-.14-.34-.32L3.18 2.2h1.66l2.12 12.36a.34.34 0 0 1-.34.32z"/>
        </svg>
      )
    },
    {
      name: 'Stripe',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 10.3c0-3.3-1.6-4.9-4.8-4.9-3.2 0-5.1 1.7-5.1 4.9 0 3.8 2.6 4.7 5.5 5.3.4.1.8.2.8.5 0 .2-.2.4-.6.4-.6 0-1.5-.2-2.1-.5l-.4 2.5c.7.3 1.9.5 2.8.5 3.3 0 5-1.6 5-4.8 0-3.9-2.6-4.8-5.6-5.4-.4-.1-.8-.2-.8-.5 0-.2.2-.4.6-.4.6 0 1.3.2 1.8.4l.5-2.5zm-15.1 2.3c0-1.8-1.3-2.3-3-.2l-.1.1v-2.1h-3v14.4h3.1V15c.9-1.2 2.1-1.7 3-1.7v-.7zM1 6.8h3.1v3h-3.1z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.004 0C5.374 0 0 5.343 0 11.936c0 2.107.551 4.16 1.6 5.975L.03 23.905l6.19-1.614a11.968 11.968 0 0 0 5.784 1.493c6.631 0 12-5.342 12-11.935S18.63 0 12.004 0zm0 21.879a9.92 9.92 0 0 1-5.068-1.385l-.364-.216-3.766.983.996-3.649-.239-.379a9.882 9.882 0 0 1-1.517-5.297c0-5.474 4.471-9.921 9.958-9.921 5.485 0 9.957 4.447 9.957 9.921 0 5.474-4.472 9.924-9.957 9.924zm5.46-7.422c-.299-.148-1.77-.872-2.045-.972-.273-.1-.472-.148-.671.148-.2.298-.771.97-.946 1.171-.173.197-.348.223-.647.074-1.127-.565-1.921-1.025-2.665-2.292-.196-.339.196-.314.561-1.042.062-.124.031-.235-.015-.335-.047-.1-.472-1.139-.647-1.56-.17-.41-.341-.353-.472-.361-.122-.005-.262-.006-.4-.006a.78.78 0 0 0-.559.26c-.198.223-.758.74-.758 1.801 0 1.062.771 2.087.882 2.235.11.148 1.517 2.316 3.675 3.245.513.221.914.354 1.226.453.518.163.99.141 1.362.086.417-.06 1.77-.723 2.019-1.42.249-.696.249-1.293.174-1.42-.075-.124-.275-.198-.574-.346z"/>
        </svg>
      )
    },
    {
      name: 'Vercel',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 22.525H0L12 1.748L24 22.525Z"/>
        </svg>
      )
    },
    {
      name: 'Supabase',
      logo: (
        <svg className="h-5 max-h-6 fill-current" viewBox="0 0 24 24">
          <path d="M21.36 11.1H13.6a.42.42 0 0 1-.41-.42V2.64A1.66 1.66 0 0 0 10.4 1.48L2.64 11.23a1.66 1.66 0 0 0 1.28 2.67H11.6a.42.42 0 0 1 .41.42v8.2a1.66 1.66 0 0 0 2.79 1.16l8.3-9.52a1.66 1.66 0 0 0-1.28-2.67V11.1z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="bg-transparent py-16" id="trust-partners">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold tracking-wide text-slate-500 mb-10 font-sans">
          Trusted by Growing Businesses Worldwide
        </p>
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-8 items-center justify-items-center opacity-65 hover:opacity-100 transition-opacity duration-300">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors duration-300"
              title={`${brand.name} Integration Partner`}
            >
              <div className="flex items-center gap-1.5 select-none">
                {brand.logo}
                <span className="font-sans font-bold text-sm tracking-tight">
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
