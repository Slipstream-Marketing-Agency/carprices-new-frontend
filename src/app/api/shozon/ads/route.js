// app/api/shozon/ads/route.js
export const dynamic = "force-dynamic";

const SHOZON_ENDPOINT = "https://motors.shozon.com/api/motors_ads_list";

/**
 * Expects JSON body:
 * {
 *   filters: [{ title: "Keyword", value: "toyota" }, ...], // array (optional)
 *   page: 1                                                // number (optional)
 * }
 */
export async function POST(req) {
  try {
    const { filters = [], page } = await req.json();

    // Build multipart/form-data with Web FormData (Node 18+ / Next runtime supports it)
    const form = new FormData();
    form.append("search", JSON.stringify(filters || []));
    if (typeof page === "number" && !Number.isNaN(page)) {
      form.append("page", String(page));
    }

    const upstream = await fetch(SHOZON_ENDPOINT, {
      method: "POST",
      body: form,
      // Note: no extra headers needed; FormData sets content-type with boundary automatically.
      // If Shozon requires special headers in the future, add them here.
      // Next's fetch is already server-side; no CORS problems.
      cache: "no-store",
    });

    // Pass through JSON (or bubble up error details if possible)
    const data = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          status: upstream.status,
          message: "Upstream error from Shozon",
          data,
        }),
        { status: upstream.status, headers: { "content-type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: "Server error",
        error: String(err?.message || err),
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
