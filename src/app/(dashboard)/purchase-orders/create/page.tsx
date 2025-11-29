"use client";
import CreateOrderForm from "@/components/features/purchaseOrders/CreateOrderForm";
import { purchaseOrderStyles } from "@/styles/purchaseOrder.styles";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function CreateOrderPage() {
  return (
    <div className={purchaseOrderStyles.pageWrapper}>
        {/* Navigation back */}
        <div className="w-full md:w-[85%] mb-2 flex justify-start">
            <Link href="/" className="flex items-center gap-2 text-space-500 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>
        </div>

        <CreateOrderForm />
    </div>
  );
}