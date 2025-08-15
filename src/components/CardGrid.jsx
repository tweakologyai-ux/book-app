import { motion } from 'framer-motion';

export default function CardGrid({ items = [], onClick }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.id || idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.03 }}
          whileHover={{ y: -2 }}
          className="card overflow-hidden"
        >
          {item.cover && (
            <img src={item.cover} alt={item.title} className="h-44 w-full object-cover" />
          )}
          <div className="p-4">
            <h3 className="text-base font-semibold">{item.title}</h3>
            {item.description && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{item.description}</p>
            )}
            {onClick && (
              <button onClick={() => onClick(item)} className="btn-primary mt-3">
                View
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
