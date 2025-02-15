"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { PdfCard } from "./pdf-card";

const MotionCard = motion(Card);

// Format date consistently
const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
};

// Demo data
const demoPdfs = [
  {
    id: 1,
    name: "Research Paper",
    originalName: "research_paper_v1.pdf",
    createdAt: "2024-02-15T12:00:00Z",
  },
  {
    id: 2,
    name: "Project Documentation",
    originalName: "project_docs.pdf",
    createdAt: "2024-02-14T15:30:00Z",
  },
];

export function ChatWithPdfContent() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleCardClick = (id: number) => {
    router.push(`/chat-with-pdf/${id}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-50 dark:from-cyan-950 dark:via-black dark:to-cyan-950">
      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-b from-indigo-300/30 to-cyan-300/30 dark:from-indigo-500/20 dark:to-cyan-500/20 blur-3xl rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-t from-blue-300/30 to-purple-300/30 dark:from-blue-500/20 dark:to-purple-500/20 blur-3xl rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Heading Section */}
          <motion.div variants={itemVariants} className="text-center space-y-2 my-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent"
            >
              Chat with PDF
            </motion.h1>
            <motion.p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
              Have interactive conversations with your PDF documents using AI
            </motion.p>
          </motion.div>

          {/* PDF Upload Area */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <MotionCard className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  Drop Your PDF
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or click to select a file
                </p>
                <Button variant="outline">
                  Select PDF
                </Button>
              </div>
            </MotionCard>
          </motion.div>

          {/* Search and Sort Section */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 relative">
              <Input
                placeholder="Search PDFs..."
                className="pl-10 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px] bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* PDF List */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              List of PDFs
            </h2>
            {demoPdfs.map((pdf) => (
              <PdfCard
                key={pdf.id}
                pdf={pdf}
                onCardClick={handleCardClick}
                formatDate={formatDate}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
