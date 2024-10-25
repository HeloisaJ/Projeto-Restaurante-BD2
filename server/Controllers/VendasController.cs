using Microsoft.AspNetCore.Mvc;
using Pizzaria.Models;
using Pizzaria.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendasController : ControllerBase
    {
        private readonly VendaService _vendaService;

        public VendasController(VendaService vendaService) {
            _vendaService = vendaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Venda>>> Get() {
            var vendas = await _vendaService.GetAllVendasAsync();
            return Ok(vendas);
        }
    }
}
