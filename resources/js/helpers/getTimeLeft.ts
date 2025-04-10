export const getTimeLeft = (time: Date): string => {
  const now = new Date();
  const end = new Date(time);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return '--:--';

  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const months = Math.floor(days / 30);

  if (months >= 1) return `${months} Month${months > 1 ? 's' : ''}`;
  if (days >= 1) return `${days} Day${days > 1 ? 's' : ''}`;
  if (hours >= 0 || minutes >= 0) {
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  return '--:--';
};
