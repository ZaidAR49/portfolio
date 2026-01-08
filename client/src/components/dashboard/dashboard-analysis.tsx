import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";

export const AnalysisDashboard = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: "Total Views", value: "12,453", change: "+12%", color: "text-emerald-400" },
                { label: "Profile Clicks", value: "845", change: "+5%", color: "text-blue-400" },
                { label: "Project Views", value: "3,210", change: "+18%", color: "text-purple-400" },
                { label: "Contact Requests", value: "24", change: "+2%", color: "text-pink-400" },
            ].map((stat, i: number) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-[var(--text-secondary)]/10 bg-[var(--bg-secondary)]/30 hover:bg-[var(--bg-secondary)]/50 transition-all group cursor-pointer hover:-translate-y-1">
                    <h3 className="text-[var(--text-secondary)] text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full bg-white/5 ${stat.color}`}>{stat.change}</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full mt-4 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full bg-current opacity-50 ${stat.color.replace('text', 'bg')}`}
                        />
                    </div>
                </div>
            ))}
        </div>

        {/* Fake Chart Area */}
        <div className="glass-panel p-6 lg:p-10 rounded-3xl border border-[var(--text-secondary)]/10 bg-[var(--bg-secondary)]/20">
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
                <FaChartLine className="text-[var(--accent)]" />
                Performance Analytics
            </h3>
            <div className="h-64 md:h-80 w-full flex items-end gap-2 md:gap-4 px-2">
                {[40, 65, 30, 80, 55, 90, 45, 60, 75, 50, 85, 95].map((h, i: number) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group h-full relative">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs">
                            {h * 124} views
                        </div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className="w-full bg-gradient-to-t from-[var(--accent)]/10 to-[var(--accent)] rounded-t-lg hover:from-[var(--accent)] hover:to-[var(--accent)]/80 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />
                        </motion.div>
                        <span className="text-xs text-[var(--text-secondary)] text-center mt-2 hidden md:block">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
