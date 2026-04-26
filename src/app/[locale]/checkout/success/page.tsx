import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 min-h-screen bg-creme flex items-center justify-center">
        <p className="text-xs tracking-widest uppercase text-dark/30">Carregando...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
