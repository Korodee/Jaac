import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* ... existing footer content ... */}
        
        <div className="mt-4">
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <Link 
                href="/politique-confidentialite" 
                className="hover:underline"
              >
                Politique de Confidentialité
              </Link>
            </li>
            <li>
              <Link 
                href="/politique-cookies" 
                className="hover:underline"
              >
                Politique de Témoins
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 