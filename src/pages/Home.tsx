import Hero from "@/components/Hero";
import { CharacterList } from "@/components/CharacterList";

const Home = () => {
	return (
		<div className="container mx-auto flex flex-col gap-8">
			<Hero />
			<CharacterList />
		</div>
	);
};

export default Home;
