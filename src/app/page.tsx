import dynamic from "next/dynamic";
// import DashboardPage from "./(dashboard)/page";

const DashboardPage = dynamic(() => import("./(dashboard)/page"), {
  ssr: true
});

export default function Home() {
  return (
    <div>
      <DashboardPage></DashboardPage>
    </div>
  );
}
