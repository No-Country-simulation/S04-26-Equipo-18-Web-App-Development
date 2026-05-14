import ContractorAuth from "../components/ContractorAuth";


export const ContractorAuthPage = () => {

    return (
        <div className="flex items-center justify-center py-10 md:py-28 px-4">
            <div className="w-full max-w-md">

                <ContractorAuth />

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        {"¿No tenés un token de invitación? "}
                        <a href="mailto:support@northpay.com" className="text-primary hover:underline">
                            Contactar soporte
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ContractorAuthPage;