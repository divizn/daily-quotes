<script>
    // You can replace this with the actual path to your SVG logo
    import logo from '$lib/images/main-component.svg'
    const githubLink = 'https://github.com/divizn';
  </script>
  
  <header class="flex items-center justify-between p-4 bg-white shadow-lg">
    <div class="flex items-center space-x-2">
      <img src={logo} alt="Logo" class="h-8 w-8" />
      <span class="font-semibold text-xl">Daily Quotes</span>
    </div>
  
    <a href={githubLink} target="_blank" class="flex items-center space-x-2 text-gray-700 hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
        <path fill-rule="evenodd" d="M12 0a12 12 0 00-3.797 23.399c.6.111.82-.261.82-.581v-2.2c-3.338.724-4.042-1.412-4.042-1.412-.546-1.389-1.332-1.759-1.332-1.759-1.089-.744.082-.728.082-.728 1.205.085 1.838 1.255 1.838 1.255 1.071 1.834 2.809 1.304 3.493.997.107-.775.419-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.932 0-1.31.468-2.382 1.234-3.221-.124-.305-.535-1.533.117-3.196 0 0 1.008-.322 3.303 1.23a11.462 11.462 0 016.011 0c2.293-1.553 3.302-1.23 3.302-1.23.653 1.663.241 2.891.118 3.196.768.839 1.234 1.911 1.234 3.221 0 4.61-2.804 5.624-5.475 5.92.431.372.815 1.106.815 2.228v3.3c0 .322.219.694.823.578A12 12 0 0012 0z" clip-rule="evenodd" />
      </svg>
    </a>
  </header>
  