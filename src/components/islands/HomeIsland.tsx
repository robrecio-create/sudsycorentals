import ClientApp from "@/components/ClientApp";
import Index from "@/views/Index";

// Force cache bust v2
const VERSION = "2.0.0";

export default function HomeIsland() {
  return (
    <ClientApp>
      <Index />
    </ClientApp>
  );
}
