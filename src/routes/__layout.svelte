<script>
import './styles.css'
</script>

<main>
  <slot />
</main>
<p>Powered by <a href="https://pokeapi.co/">https://pokeapi.co/</a></p>

<style>
main {
  flex-grow: 1;
}
a {
  color: inherit;
}
p {
  color: #888;
  font-size: 85%;
  text-align: center;
}
</style>