import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  // For now, we'll handle authentication on the client side
  // In a production app, you'd want server-side auth checking
  return <DashboardClient user={null} />;
}
