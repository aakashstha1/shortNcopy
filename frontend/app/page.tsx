"use client";

import { useState } from "react";
import { Check, Copy, CheckCircle2 } from "lucide-react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import type { AxiosError } from "axios";

import { useShortenUrl } from "./features/url/useShortenUrl";

import Heading from "@/components/common/Heading";
import { Input } from "@/components/ui/input";
import Steps from "@/components/common/Steps";
import { Button } from "@/components/ui/button";
import { urlSchema } from "@/utils/urlSchema";

const inputClasses =
  "border border-border bg-background overflow-hidden shadow-none focus-visible:ring-0 transition-all focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-500";

const buttonClasses =
  "font-semibold gap-2 bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const { mutate, isPending } = useShortenUrl();

  const handleShortenUrl = () => {
    const result = urlSchema.safeParse({
      originalUrl: url,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    toast.dismiss();

    mutate(
      { originalUrl: result.data.originalUrl },
      {
        onSuccess: (data) => {
          setShortUrl(data.data.shortUrl);
          toast.success(data?.message || "Short URL generated!");
        },
        onError: (err: unknown) => {
          const error = err as AxiosError<{ message: string }>;
          toast.error(
            error?.response?.data?.message || "Failed to shorten URL",
          );
        },
      },
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const commonInputProps = {
    type: "search" as const,
    value: url,
    placeholder: "Enter your url here...",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setUrl(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleShortenUrl();
    },
  };

  return (
    <div className="min-h-screen bg-background lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-4xl lg:border-4 lg:border-dashed lg:border-gray-200 lg:rounded-4xl p-8 lg:p-10">
        <Heading />

        {/* Desktop */}
        <div className={`hidden md:flex rounded-xl ${inputClasses} mb-8`}>
          <Input
            {...commonInputProps}
            className="flex-1 border-0 rounded-none h-12 px-4 text-sm"
          />
          <div className="flex shrink-0 items-stretch">
            <div className="w-px bg-border" />
            <Button
              onClick={handleShortenUrl}
              disabled={isPending}
              className={`rounded-none rounded-r-xl h-12 px-5 text-sm w-32 ${buttonClasses}`}
            >
              {isPending ? <HashLoader size={20} color="#fff" /> : "Generate"}
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col space-y-2 mb-6">
          <Input
            {...commonInputProps}
            className={`px-4 rounded-xl text-sm ${inputClasses}`}
          />
          <Button
            onClick={handleShortenUrl}
            disabled={isPending}
            className={`w-full rounded-xl h-10 px-5 text-sm ${buttonClasses}`}
          >
            {isPending ? <HashLoader size={20} color="#fff" /> : "Generate"}
          </Button>
        </div>

        {/* Result */}
        {shortUrl && (
          <div className="flex items-center gap-3 bg-muted border border-border rounded-xl px-3 py-2 md:px-4 md:py-3 mb-8">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />

            {/* Short URL */}
            <span
              onClick={() => {
                if (window.innerWidth < 768) {
                  handleCopy();
                }
              }}
              className="flex-1 min-w-0 font-mono text-sm font-medium text-emerald-600 dark:text-emerald-400 cursor-pointer md:cursor-default overflow-x-auto whitespace-nowrap no-scrollbar"
            >
              {shortUrl}
            </span>

            {/* Desktop only copy button */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="text-xs font-semibold gap-1.5 h-8 rounded-lg"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        <div className="h-px bg-border mb-6" />
        <Steps />
      </div>
    </div>
  );
}
