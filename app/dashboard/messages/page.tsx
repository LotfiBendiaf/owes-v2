import { requireUser } from "@/lib/authorization";
import { Card, CardContent } from "@/components/ui/card";
export default async function MessagesPage() { await requireUser(); return <div><h1 className="text-3xl font-black">Messages</h1><Card className="mt-8"><CardContent className="py-14 text-center text-slate-500">Une conversation apparaîtra lorsqu’un expert sera affecté à votre demande.</CardContent></Card></div>; }
