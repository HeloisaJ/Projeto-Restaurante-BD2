using Microsoft.AspNetCore.Mvc;
using Pizzaria.Models;
using Pizzaria.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsosController : ControllerBase
    {
        private readonly UsoService _usoService;

        public UsosController(UsoService usoService) {
            _usoService = usoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Usos>>> Get() {
            var usos = await _usoService.GetAllUsosAsync();
            return Ok(usos);
        }
    }
}
