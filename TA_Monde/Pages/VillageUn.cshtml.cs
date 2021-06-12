using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TA_Monde.Pages
{
    public class VillageUnModel : PageModel
    {
        private readonly ILogger<VillageUnModel> _logger;

        public VillageUnModel(ILogger<VillageUnModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}
