<template>
	<nav>
		<ul>
			<li>
				<NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
			</li>
			<li>
				<NuxtLink :to="{ name: 'create' }">Create</NuxtLink>
			</li>
		</ul>
	</nav>
</template>
