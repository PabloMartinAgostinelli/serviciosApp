import { getProviders, getCategories } from '@/lib/db'
import ProviderList from '@/components/ProviderList'
import CategoryList from '@/components/CategoryList'

export default async function Home() {
  const providers = await getProviders()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Servicios App</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <CategoryList categories={categories} />
          </aside>
          <div className="md:col-span-3">
            <ProviderList providers={providers} />
          </div>
        </div>
      </main>
    </div>
  )
}

