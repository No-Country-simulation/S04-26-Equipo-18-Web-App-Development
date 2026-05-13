import ContractorAuth from "../components/ContractorAuth";


export const ContractorAuthPage = () => {

    return (
        <div className="flex items-center justify-center py-10 md:py-28 px-4">
            <div className="w-full max-w-md">

                <ContractorAuth />

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        {"Don't have an invitation token? "}
                        <a href="mailto:support@northpay.com" className="text-primary hover:underline">
                            Contact support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ContractorAuthPage;