import Hero from "@/components/Hero";
import { CharacterList } from "@/components/CharacterList";

const Home = () => {
	return (
		<div className="container mx-auto flex h-full flex-col gap-8 p-4">
			<Hero />
			<CharacterList />
		</div>
	);
};

export default Home;
