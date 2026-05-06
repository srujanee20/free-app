const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
    </div>
);

const PersonaDeckUserDetails = ({ user }) => {
    if (!user) return null;

    return (
        <div className="space-y-6 animate-fade-in delay-150">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-center">
                    <p className="text-[10px] text-blue-500 uppercase tracking-widest font-bold mb-1">Age</p>
                    <p className="text-lg sm:text-xl font-extrabold text-blue-900">{user.dob?.age} yrs</p>
                </div>
                <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-center">
                    <p className="text-[10px] text-indigo-500 uppercase tracking-widest font-bold mb-1">Member Since</p>
                    <p className="text-lg sm:text-xl font-extrabold text-indigo-900">{new Date(user.registered?.date).getFullYear()}</p>
                </div>
            </div>

            {/* Contact Details */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Information</h3>
                <DetailRow label="Email" value={user.email} />
                <DetailRow label="Phone" value={user.phone} />
                <DetailRow label="Cell" value={user.cell} />
            </div>

            {/* Location */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Location</h3>
                <DetailRow label="Street" value={`${user.location?.street?.number} ${user.location?.street?.name}`} />
                <DetailRow label="City" value={user.location?.city} />
                <DetailRow label="State" value={user.location?.state} />
                <DetailRow label="Country" value={user.location?.country} />
                <DetailRow label="Postcode" value={user.location?.postcode} />
                <DetailRow label="Timezone" value={`UTC ${user.location?.timezone?.offset}`} />
            </div>

            {/* Account Details */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Account Reference</h3>
                <DetailRow label="Username" value={user.login?.username} />
                <DetailRow label="UUID" value={<span className="text-[10px] font-mono bg-gray-200 px-1.5 py-0.5 rounded">{user.login?.uuid?.split('-')[0]}...</span>} />
            </div>
        </div>
    );
};

export default PersonaDeckUserDetails;
