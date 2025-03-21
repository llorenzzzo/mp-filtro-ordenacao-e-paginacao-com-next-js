"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type PaginationProps = {
  links: {
    url: string;
    label: string;
    active: boolean;
    id: number;
  }[];
  maxPage: number;
};

export default function Pagination({ links, maxPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    if (pageNumber > 1) {
      if (pageNumber > maxPage) {
        params.set("page", maxPage.toString());
      } else {
        params.set("page", pageNumber.toString());
      }
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          onClick={() =>
            handleClickPage(Number(searchParams.get("page") || 1) - 1)
          }
          className={`${
            links[0].url
              ? "cursor-pointer"
              : "cursor-auto text-slate-300 hover:text-slate-300"
          }`}
        >
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {
          if (
            link.label.includes("Anterior") ||
            link.label.includes("Próximo")
          ) {
            return null;
          }

          if (link.label === "...") {
            return (
              <PaginationItem key={link.id} className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={link.id} className="cursor-pointer">
              <PaginationLink
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          onClick={() =>
            handleClickPage(Number(searchParams.get("page") || 1) + 1)
          }
          className={`${
            links[links.length - 1].url
              ? "cursor-pointer"
              : "cursor-auto text-slate-300 hover:text-slate-500"
          }`}
        >
          <PaginationNext />
        </PaginationItem>

        {/* <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink isActive={true}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>8</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>9</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem> */}
      </PaginationContent>
    </PaginationComponent>
  );
}
