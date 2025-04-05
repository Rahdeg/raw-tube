import { Homelayout } from "@/modules/home/ui/layout/home-layout";
export const dynamic = "force-dynamic";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Homelayout>
            {children}
        </Homelayout>
    )
}

export default Layout