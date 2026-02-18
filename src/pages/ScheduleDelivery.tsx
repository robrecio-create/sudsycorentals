import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeliveryScheduleForm from "@/components/DeliveryScheduleForm";
import { useAuth } from "@/contexts/AuthContext";

const ScheduleDelivery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="py-12 px-4">
        <DeliveryScheduleForm
          userId={user?.id}
          customerName={user?.user_metadata?.full_name || user?.email?.split("@")[0]}
          customerEmail={user?.email}
          showContactFields={!user}
          onSuccess={() => navigate("/")}
          onCancel={() => navigate(-1)}
          cancelLabel="Go Back"
        />
      </main>
      <Footer />
    </div>
  );
};

export default ScheduleDelivery;
