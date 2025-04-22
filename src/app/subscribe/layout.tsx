import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abonnements | JAAC - Soutien psychologique',
  description: 'Découvrez nos abonnements mensuels et annuels pour un soutien psychologique professionnel. Plans adaptés aux particuliers et aux entreprises.',
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 