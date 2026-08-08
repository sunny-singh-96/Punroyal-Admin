import { LucideIcon } from "lucide-react";

interface StatItem {
    icon: LucideIcon,
    label: string,
    value: string | number,
    color: string,
    bg: string
}

type Props = {
  items: StatItem[];
};

export const StatsCards = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4">
      {items.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-bold text-slate-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 md:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={18} className="md:w-5 md:h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
