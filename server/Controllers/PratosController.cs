using Microsoft.AspNetCore.Mvc;
using Pizzaria.Models;
using Pizzaria.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PratosController : ControllerBase
    {
        private readonly PratoService _pratoService;

        public PratosController(PratoService pratoService) {
            _pratoService = pratoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Prato>>> Get() {
            var pratos = await _pratoService.GetAllPratosAsync();
            return Ok(pratos);
        }
    }
}
