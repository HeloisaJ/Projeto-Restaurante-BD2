using Microsoft.AspNetCore.Mvc;
using serverApi.Models;
using serverApi.Services;

namespace serverApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly IngredientService _ingredientService;

        public IngredientsController(IngredientService ingredientService) {
            _ingredientService = ingredientService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ingredient>>> Get() {
            var ingredients = await _ingredientService.GetAllIngredientsAsync();
            return Ok(ingredients);
        }
    }
}
