import { Card } from "./ui/card";

interface TestimonialCardProps {
  quote: string;
  content: string;
  author: string;
  role: string;
  image: string;
}

export default function TestimonialCard({
  quote,
  content,
  author,
  role,
  image,
}: TestimonialCardProps) {
  return (
    <Card className="bg-[#0A080E] text-white  max-w-md rounded-[30px] shadow-lg gap-[55px] border-[1px] border-solid border-[##C9C9C9] p-[40px] ">
      <div className="space-y-6">
        {/* Image Section */}
        <div className="h-12 w-12 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={`${author}'s profile`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Quote and Content Section */}
        <div className="space-y-4">
          <blockquote className="text-2xl font-semibold leading-tight">
            "{quote}"
          </blockquote>
          <p className="text-gray-300 leading-relaxed">{content}</p>
        </div>

        {/* Author and Role */}
        <div className="text-[#4ADE80]">
          <p className="font-medium">
            — {author}, <span className="italic">{role}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
