import Navbar from './Navbar';
import MobileFooter from './MobileFooter';
import StickyCart from './StickyCart';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <StickyCart />
            <MobileFooter />
        </div>
    );
}
