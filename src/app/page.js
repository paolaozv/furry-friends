// import styles from './page.module.css'
import Layout from "./components/Layout";
import PetsSection from "./components/PetsSection";

export const metadata = {
  title: 'Adopt a furry friend',
  description: 'This website has been created with the purpose of finding a home for dogs and cats.',
};

export default function Home() {

  return (
    <main>
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-16">
            <div>
              <h1 className="text-center font-bold text-5xl leading-normal">
                Every Pet Deserves a Loving Home.<br/>
                <span className="text-primary">Adopt</span> a Pet Today
              </h1>
              <div className="w-4/5 mt-4 mx-auto">
                <p className="text-center text-lg">
                  Browse our available animals and learn more about the adoption process.
                  Together, we can <span className="font-bold">rescue, rehabilitate, and rehome pets in need.</span>
                  Thank you for supporting our mission to bring joy to families through pet adoption.
                </p>
              </div>
            </div>
            <PetsSection />
          </div>
        </div>
      </Layout>
      <div>
      </div>
    </main>
  )
}
