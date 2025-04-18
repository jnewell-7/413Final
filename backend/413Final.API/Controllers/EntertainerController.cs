using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;          // 👈 for .Include
using _413Final.API.Data;
using System.Linq;

namespace _413Final.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private readonly EntertainerDbContext _context;
        public EntertainerController(EntertainerDbContext context) => _context = context;

        /* ───────────────────────── LIST ───────────────────────── */
        [HttpGet("AllEntertainers")]
        public IActionResult GetEntertainers(int pageSize = 10, int pageNum = 1)
        {
            var totalCount = _context.Entertainers.Count();

            var entertainers = _context.Entertainers
                .Include(e => e.Engagements)                    // eager‑load bookings
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .Select(e => new
                {
                    entertainerID    = e.EntertainerID,
                    entStageName     = e.EntStageName     ?? "",
                    entSSN           = e.EntSSN           ?? "",
                    entStreetAddress = e.EntStreetAddress ?? "",
                    entCity          = e.EntCity          ?? "",
                    entState         = e.EntState         ?? "",
                    entZipCode       = e.EntZipCode       ?? "",
                    entPhoneNumber   = e.EntPhoneNumber   ?? "",
                    entWebPage       = e.EntWebPage       ?? "",
                    entEMailAddress  = e.EntEMailAddress  ?? "",
                    dateEntered      = e.DateEntered      ?? "",

                    /* booking stats */
                    timesBooked = e.Engagements.Count(),
                    lastBooked  = e.Engagements
                                   .OrderByDescending(g => g.StartDate)
                                   .Select(g => g.StartDate)
                                   .FirstOrDefault() ?? ""
                })
                .ToList();

            return Ok(new { entertainers, totalCount });
        }

        /* ─────────────────────── DETAILS ─────────────────────── */
        [HttpGet("GetEntertainerByID")]
        public IActionResult GetEntertainerByID(int entertainerID)
        {
            var e = _context.Entertainers
                            .Include(x => x.Engagements)          // eager‑load here too
                            .FirstOrDefault(x => x.EntertainerID == entertainerID);

            if (e == null)
                return NotFound(new { message = "Entertainer not found." });

            var dto = new
            {
                entertainerID    = e.EntertainerID,
                entStageName     = e.EntStageName     ?? "",
                entSSN           = e.EntSSN           ?? "",
                entStreetAddress = e.EntStreetAddress ?? "",
                entCity          = e.EntCity          ?? "",
                entState         = e.EntState         ?? "",
                entZipCode       = e.EntZipCode       ?? "",
                entPhoneNumber   = e.EntPhoneNumber   ?? "",
                entWebPage       = e.EntWebPage       ?? "",
                entEMailAddress  = e.EntEMailAddress  ?? "",
                dateEntered      = e.DateEntered      ?? "",

                timesBooked = e.Engagements.Count(),
                lastBooked  = e.Engagements
                               .OrderByDescending(g => g.StartDate)
                               .Select(g => g.StartDate)
                               .FirstOrDefault() ?? ""
            };

            return Ok(dto);
        }

        /* ─────────────────────── CREATE ─────────────────────── */
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();
            return Ok(newEntertainer);
        }

        /* ─────────────────────── UPDATE ─────────────────────── */
        [HttpPut("UpdateEntertainer/{entertainerID}")]
        public IActionResult UpdateEntertainer([FromBody] Entertainer updatedEntertainer)
        {
            var existing = _context.Entertainers
                .FirstOrDefault(e => e.EntertainerID == updatedEntertainer.EntertainerID);
            if (existing == null) return NotFound(new { message = "Entertainer not found." });

            existing.EntStageName     = updatedEntertainer.EntStageName;
            existing.EntSSN           = updatedEntertainer.EntSSN;
            existing.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existing.EntCity          = updatedEntertainer.EntCity;
            existing.EntState         = updatedEntertainer.EntState;
            existing.EntZipCode       = updatedEntertainer.EntZipCode;
            existing.EntPhoneNumber   = updatedEntertainer.EntPhoneNumber;
            existing.EntWebPage       = updatedEntertainer.EntWebPage;
            existing.EntEMailAddress  = updatedEntertainer.EntEMailAddress;
            existing.DateEntered      = updatedEntertainer.DateEntered;

            _context.SaveChanges();
            return Ok(existing);
        }

        /* ─────────────────────── DELETE ─────────────────────── */
        [HttpDelete("DeleteEntertainer/{entertainerID}")]
        public IActionResult DeleteEntertainer(int entertainerID)
        {
            var entertainer = _context.Entertainers.Find(entertainerID);
            if (entertainer == null)
                return NotFound(new { message = "Entertainer not found." });

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();
            return NoContent();
        }
    }
}