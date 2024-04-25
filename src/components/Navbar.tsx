"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import {UserDetails} from "@/components/Sidebar";
import {getUserAuth} from "@/lib/auth/utils";

export default async function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
    const session = await getUserAuth();
    if (session.session === null) return null;
  return (
    <div className="md:hidden border-b mb-4 pb-2 w-full">
      <nav className="flex justify-between w-full items-center">
  <h3 className="text-lg font-bold font-mono ml-4">SLEEPCATCH</h3>        <Button variant="ghost" onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className="my-4 p-4 bg-muted">
          <ul className="space-y-2">
            {defaultLinks.map((link) => (
              <li key={link.title} onClick={() => setOpen(false)} className="">
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "text-primary hover:text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <UserDetails  session={session} />
        </div>
      ) : null}
    </div>
  );
}
