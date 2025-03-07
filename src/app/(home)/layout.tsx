import { Homelayout } from "@/modules/home/ui/layout/home-layout";

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