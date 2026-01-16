import Navbar from './Navbar';
import Footer from './Footer';
import MobileFooter from './MobileFooter';
import StickyCart from './StickyCart';
import DeliveryTracking from './DeliveryTracking';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <StickyCart />
            <DeliveryTracking />
            <MobileFooter />
        </div>
    );
}
