export const duplicationsColorMap: { max: number; progress: number; color: string; trailColor: string }[] = [
  { max: 3, progress: 0.02, color: '#12b76a', trailColor: '#eff2f9' },
  { max: 5, progress: 0.04, color: '#6eb712', trailColor: '#eff2f9' },
  { max: 10, progress: 0.07, color: '#f5b840', trailColor: '#eff2f9' },
  { max: 20, progress: 0.15, color: '#f75f09', trailColor: '#eff2f9' },
  { max: Infinity, progress: 0.30, color: '#f04438', trailColor: '#eff2f9' },
];