import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ganesh R Pattanshetti — Software Engineer · Aspiring Data Scientist",
  description:
    "CS graduate from Karnataka passionate about AI, Data Analysis, and building impactful software. Talk to my AI Manager to learn more about my skills and projects.",
  keywords: [
    "Ganesh R Pattanshetti",
    "Software Engineer",
    "AI ML Engineer",
    "Data Analyst",
    "Python Developer",
    "Frontend Developer",
    "React",
    "MySQL",
    "Machine Learning",
    "Data Science",
    "Portfolio",
    "Karnataka",
    "India",
  ],
  openGraph: {
    title: "Ganesh R Pattanshetti — Software Engineer · Aspiring Data Scientist",
    description:
      "Talk to my AI Manager to learn more about my skills, projects, and availability.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
