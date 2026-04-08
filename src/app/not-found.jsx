import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBox from "@/components/Forms/SearchBox";

export default function NotFound() {
    return (
        <>
            <Header />
            <div role="main" className="main">
                <section className="not-found-section d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h1 className="error-code">404</h1>
                        <h2 className="error-title">Page Not Found</h2>
                        <p className="error-description">
                            Oops! The page you’re looking for doesn’t exist or has been moved.
                        </p>
                        <div className="input-group p-0 my-lg-3 my-3 generic-search">
                            <SearchBox />
                        </div>
                        <div className="from-btn">
                            <a href="/" className="btn w-50 mt-4">Go Back Home</a>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

