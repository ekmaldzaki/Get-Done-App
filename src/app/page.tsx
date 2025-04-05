import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}
