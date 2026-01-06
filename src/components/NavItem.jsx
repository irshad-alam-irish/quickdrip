
export default function NavItem({ icon: Icon, label, badgeCount, onClick }) {
    return (
        <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
            <div className="relative">
                <Icon className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" strokeWidth={1.5} />
                {badgeCount !== undefined && badgeCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {badgeCount}
                    </span>
                )}
            </div>
            <span className="text-[12px] font-semibold text-gray-700 mt-1 group-hover:text-black transition-colors hidden md:block tracking-wide">{label}</span>
        </div>
    )
}
