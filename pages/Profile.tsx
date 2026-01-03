import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Clock, Book, Flame } from 'lucide-react';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 1.2 },
  { name: 'Wed', hours: 3.8 },
  { name: 'Thu', hours: 0.5 },
  { name: 'Fri', hours: 4.2 },
  { name: 'Sat', hours: 5.5 },
  { name: 'Sun', hours: 3.0 },
];

const Profile: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Profile & Stats</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Book, label: 'Chapters Read', value: '1,284', color: 'bg-blue-100 text-blue-600' },
          { icon: Clock, label: 'Time Spent', value: '142h', color: 'bg-emerald-100 text-emerald-600' },
          { icon: Flame, label: 'Day Streak', value: '14', color: 'bg-orange-100 text-orange-600' },
          { icon: Trophy, label: 'Rank', value: 'S-Class', color: 'bg-purple-100 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">Reading Activity (Hours)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hours > 3 ? '#3b82f6' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent History */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">Continue Reading</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0 overflow-hidden">
                   <img src={`https://picsum.photos/100/150?random=${i+20}`} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-200 line-clamp-1">Omniscient Reader's Viewpoint</h4>
                  <p className="text-xs text-gray-500 mb-1">Chapter {210 - i}</p>
                  <div className="w-32 bg-gray-100 dark:bg-gray-700 h-1 rounded-full">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${80 - i*10}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;