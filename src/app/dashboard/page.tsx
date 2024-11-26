import { auth, signOut } from "@/utils/auth";
import { InvoiceCreator } from "@/components/dashboard/InvoiceCreator";

export default function Dashboard() {
    return (
        <div className="container mx-auto p-6">
           
                        <InvoiceCreator />
                 
        </div>
    );
}