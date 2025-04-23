"use client";

import { Button } from "@/components/ui/button";
import { ZapIcon } from "lucide-react";
import Link from "next/link";

const GrapesFooter = () => {

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO & COPYRIGHT */}
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1 bg-primary/10 rounded">
              <ZapIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold font-mono">
              code<span className="text-primary">flex</span>.ai
            </span>
          </Link>
        </div>

        {/* FOOTER NAVIGATION */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 mr-4">
            <Button
              asChild
              variant="outline"
              className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
            >
              <Link href="/grapesjs">Export Design to Angular</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GrapesFooter;
