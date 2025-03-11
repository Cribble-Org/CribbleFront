
const getInitials = (name: string) => {
  if(!name) return '';
  const words = name.split(" ").filter(word => word.length > 0);
  return words.map(word => word[0].toUpperCase()).slice(0, 3).join("");
};

const getRandomColor = (name: string) => {
  if(!name) return '';
  const colors = [
    "#B3FF53", "#FFC876", "#FF776F", "#858DFF", "#AC6AFF",
    "#FFC876", "#7ADB78", "#FF98E2", "#B3FF53", "#AC6AFF"
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const Avatar = ({ name }: { name: string }) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(name);

  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full text-black"
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
