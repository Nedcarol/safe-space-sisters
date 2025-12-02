import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is Safe-Space Sisters?",
      answer: "Safe-Space Sisters is an AI-powered tool designed to help women and girls combat digital harassment. It analyzes messages for toxicity, provides safety advice, and helps you communicate more safely online."
    },
    {
      question: "How does the toxicity scanner work?",
      answer: "Our scanner uses advanced AI models to analyze text for harmful content including harassment, threats, hate speech, and other forms of toxicity. It provides a toxicity score and highlights problematic words or phrases."
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes! Your data is encrypted and stored securely. We follow best practices for data protection and never share your personal information with third parties. You can delete your scan history at any time."
    },
    {
      question: "Can I use this tool for social media messages?",
      answer: "Absolutely! You can paste messages from any platform - social media, emails, texts, or comments. We also offer a browser extension for seamless integration with popular platforms."
    },
    {
      question: "What happens when toxic content is detected?",
      answer: "When toxic content is detected, you'll receive: (1) A toxicity score showing the severity, (2) Highlighted problematic words/phrases, (3) A safer alternative message suggestion, and (4) Personalized safety advice on how to respond."
    },
    {
      question: "How do I get the safer version of a message?",
      answer: "After scanning a message, our AI automatically generates a safer, more constructive version that maintains your intent while removing toxic elements. You can copy and use this version in your communications."
    },
    {
      question: "Can I track my scan history?",
      answer: "Yes! All logged-in users have access to their complete scan history in the History section. You can review past analyses, advice, and safer message versions anytime."
    },
    {
      question: "Do I need an account to use the scanner?",
      answer: "The basic toxicity scanner is available to everyone. However, creating a free account unlocks features like scan history, personalized safety tips, and the ability to save your preferences."
    },
    {
      question: "What should I do if I'm experiencing serious harassment?",
      answer: "If you're experiencing serious harassment or threats, please: (1) Document all evidence, (2) Report to the platform, (3) Contact local authorities if needed, (4) Visit our Safety Tips section for detailed guidance and resources."
    },
    {
      question: "How can I report a bug or suggest a feature?",
      answer: "We'd love to hear from you! Visit our Contact page to send us feedback, report issues, or suggest new features. Your input helps us improve and better serve our community."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Safe-Space Sisters</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/scanner")}>
              Scanner
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Safe-Space Sisters
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-8 border rounded-lg bg-card">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Feel free to reach out to us.
            </p>
            <Button onClick={() => navigate("/contact")} size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
