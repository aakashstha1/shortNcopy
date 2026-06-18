"use client";
import { Link } from "lucide-react";
import { Badge } from "../ui/badge";

function Heading() {
  return (
    <>
      {/* Badge */}
      <div className="flex items-center gap-1.5 mb-4 ">
        <Badge
          variant="outline"
          className="text-[10px] md:text-xs font-semibold tracking-widest uppercase rounded-full"
        >
          <Link className="w-3 h-3 mr-1.5 text-emerald-500" />
          URL Shortener
        </Badge>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-4">
        Short<span className="text-emerald-500">N</span>Pay
      </h1>
      <p className="text-muted-foreground text-xs md:text-base mb-8 leading-relaxed">
        Paste any long URL below get a short link instantly.
        {/* <br />
        on click. */}
      </p>
    </>
  );
}

export default Heading;
