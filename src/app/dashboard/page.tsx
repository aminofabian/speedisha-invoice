import { auth, signOut } from "@/utils/auth";
import { InvoiceCreator } from "@/components/dashboard/InvoiceCreator";

export default function Dashboard() {
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        Sign Out
                    </button>
                </form>
            </div>
            
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-200 p-4">
                        <h2 className="text-xl font-semibold">Invoice Creator</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Create and customize your invoice layout
                        </p>
                    </div>
                    <div className="p-4">
                        <InvoiceCreator />
                    </div>
                </div>
            </div>
        </div>
    );
}